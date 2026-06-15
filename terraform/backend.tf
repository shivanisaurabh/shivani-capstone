terraform {

  backend "s3" {

    bucket = "shivani-capstone-tf-state-usw1"

    key = "terraform.tfstate"

    region = "us-west-1"

  }
}