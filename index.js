/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

class ProtectDefaultBranch {
  constructor (robot) {
    this.robot = robot
  }

  RunBranchWorkflow (context) {
    // Assign class level vars
    this.context = context
    this.branchName = this.context.payload.repository.default_branch
    this.repositoryName = this.context.payload.repository.branchName
    this.orgName = this.context.payload.repository.owner.login

    // Determine if the default branch is protected
    let isProtected = this.IsDefaultBranchProtected()

    // If not, protect it, if so, do nothing
    if (!isProtected) {
      this.ProtectDefaultBranch()
      console.log('The default branch has been protected.')
    } else {
      console.log('The specified branch is already protected.')
    }
  }

  IsDefaultBranchProtected () {
    // Get parameter details
    var details = this.GetBranchDetails()

    // Pull branch protection information from GitHub
    var response = this.context.github.repos.getBranchProtection({
      owner: details.orgName,
      repo: details.repositoryName,
      branch: details.branchName,
      mediaType: {
        previews: ['luke-cage-preview']
      }
    })

    // If we receive a 'Message' object stating that the branch is not protected in our response, return false.
    if (typeof (response.message) !== 'undefined' && response.message === 'Branch not protected') {
      return true
    } else {
      return false
    }
  }

  // Protect the default branch
  ProtectDefaultBranch () {
    // Get parameter details
    var details = this.GetBranchDetails()

    // Update branch protection with minimal values. In this case, only requiring 1 approval.
    // Documentation on this functionality can be found here: https://developer.github.com/v3/repos/branches/#update-branch-protection
    this.context.github.repos.updateBranchProtection({
      owner: details.orgName,
      repo: details.repositoryName,
      branch: details.branchName,
      required_status_checks: null,
      enforce_admins: true,
      dismiss_stale_reviews: true,
      required_pull_request_reviews: {
        required_approving_review_count: 1
      },
      restrictions: null
    })
  }

  // Function to pull values from the webhook body.
  GetBranchDetails () {
    let branchDetails = {
      branchName: this.context.payload.repository.default_branch,
      repositoryName: this.context.payload.repository.branchName,
      orgName: this.context.payload.repository.owner.login
    }
    return branchDetails
  }
}

module.exports = robot => {
  const handler = new ProtectDefaultBranch(robot)
  robot.on('Create', context => {
    return handler.RunBranchWorkflow(context)
  })
}
