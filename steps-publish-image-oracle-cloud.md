1.Create container registry repository

2.Generate auth token from oracle cloud account (copy it somewhere securely on local machine, we will need it later)

3.Build image and puhs to oracle container registry

build image docker build -t [region-key].ocir.io/[namespace]/[repository-name]:[tag] .

example: docker build -t fra.ocir.io/frfwocvobvsi/agro-admin-container-registry-repo:v1 .

docker login [region-key].ocir.io

example: docker login fra.ocir.io

for username: [namespace]/[email-of-user]

example: frfwocvobvsi/mada.petruadrian@student.uoradea.ro

for password: the generated auth token

push image:

docker push [region-key].ocir.io/[namespace]/[repository-name]:[tag]

example: docker push fra.ocir.io/frfwocvobvsi/agro-admin-container-registry-repo:v1

[namespace] -> can be found in the container registry that was just created or in the user profile tenancy : Object storage namespace
[region-key] -> can be founded here in the docs to which region want to use: https://docs.oracle.com/en-us/iaas/Content/Registry/Concepts/registryprerequisites.htm#regional-availability
