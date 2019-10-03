/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

class ProtectDefaultBranch {
  constructor (robot) {
    this.robot = robot
    this.context = {}
  }

  async RunBranchWorkflow (context) {
    // Assign class level vars
    this.context = context
    this.branchName = this.context.payload.repository.default_branch
    this.repositoryName = this.context.payload.repository.branchName
    this.orgName = this.context.payload.repository.owner.login

    let isProtected = await this.IsDefaultBranchProtected()

    if (!isProtected) {
      let isProtected = await ProtectDefaultBranch()

      if (!isProtected) {
        console.log('An error occurred protecting the default branch')
      } else {
        console.log('The default branch has been protected.')
      }
    }
  }

  async IsDefaultBranchProtected () {
    var branchName = this.context.payload.repository.default_branch
    var repositoryName = this.context.payload.repository.branchName
    var orgName = this.context.payload.repository.owner.login

    var response = this.context.github.repos.getBranchProtection({
      owner: orgName,
      repo: repositoryName,
      branch: branchName,
      mediaType: {
        previews: ['luke-cage-preview']
      }
    })


  }

  async ProtectDefaultBranch () {

  }

  GetBranchDetails () {
    let branchDetails = {
      branchName: this.context.payload.repository.default_branch,
      repositoryName: this.context.payload.repository.branchName,
      orgName: this.context.payload.repository.owner.login
    }
    return
  }
}

module.exports = robot => {
  const handler = new ProtectDefaultBranch(robot)
  robot.on('Create', async context => { return handler.RunBranchWorkflow(context) })
}
