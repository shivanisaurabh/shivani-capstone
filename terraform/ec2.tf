resource "aws_instance" "jenkins_server" {

  ami           = "ami-0d382e80be7ffdae5"
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-jenkins"
  }
}