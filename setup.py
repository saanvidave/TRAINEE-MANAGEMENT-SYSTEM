from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in trainee_management/__init__.py
from trainee_management import __version__ as version

setup(
	name="trainee_management",
	version=version,
	description="Trainee Management",
	author="Trainee",
	author_email="keval@nddb.coop",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
