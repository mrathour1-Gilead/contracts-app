# DockerTest

My Docker project

## Self-Hosted Runner Optional labels

- `INSTANCE_TYPE=<INSTANCE_TYPE>` :
  Use this to specify the self-hosted runner Instance Size `(t3.micro, t3.small, etc)`. You can virtually use any type and size. If no label is specified the default value `(t3.small)` will be used.
- `INSTANCE_PROFILE_NAME=<INSTANCE_PROFILE_NAME>` :
  Use this to specify the Instance Profile name your self-hosted runner should use instead of the default one, `gh-runner-role-ip`

Any additional labels will be added as tags on the backing compute resource for the self-hosted runner as well as attached to the runner instance in GitHub Actions, but will otherwise have no intrinsic effect.

## How to provide Custom Labels

If you’re using a ***integration-workflow-*** workflow, instead of providing the labels directly to your runs-on definition you’ll use an input called `self_hosted_runner_extra_labels` (if you need to add other labels,separate them using `,`)

```bash
uses: Gilead-CPE/integration-workflow-terraform/.github/workflows/workflow.yaml@<version>
with:
  account_id: "123456789012"
  environment: dev
  self_hosted_runner_extra_labels: INSTANCE_TYPE=t3.medium
  # ...
```

## Integration with JFrog Artifactory
This workflow will create a default set of Jfrog repositories for docker and pypi package type. (The repository name is built by retreiving the Github Organization and Github repository name.)

Required files for python(pypi) package type
This should be provided in context of the docker build direcotry input variables for single/multi docker files
1. requirements.txt
*Note: If the `requirements.txt` is missing in the required context location, then we create a blank file and update it with the Jfrog index.*

### Dependency resolution
This workflow has been updated to pull package dependencies from the Gilead Jfrog repository, i.e., dependency resolution during the build phase using the `pip install` command, will directly happen via the Remote Gilead Jfrog repository.
You can choose to perform this dependency reolution either using your `project or app specific` Gilead Jfrog repositories or a `common` Gilead Jfrog repository, by using the input flag `use_common_repo` (default value for this flag is `false`).

*Note: The input flag `use_common_repo` if set to `true`, will be used for both pull and publish phases of the Jfrog Artifactory.*

## Support
- [Teams Channel](https://teams.microsoft.com/l/channel/19%3a7e42c3475bf548b290d4e57583cc08e2%40thread.skype/CPE%2520CICD%2520Support?groupId=51f85e1e-cdf1-4dce-8e28-c91b3932e648&tenantId=a5a8bcaa-3292-41e6-b735-5e8b21f4dbfd)

## Related
- [Docker reusable GitHub workflow](https://github.com/Gilead-CPE/integration-workflow-docker)
- [AWS ECR reusable GitHub workflow](https://github.com/Gilead-CPE/integration-action-ecr)
