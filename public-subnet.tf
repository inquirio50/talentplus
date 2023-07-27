# Public Subnets 
resource "aws_subnet" "reelcruit-public-subnet-one" {
  vpc_id                  = aws_vpc.reelcruit-vpc.id
  cidr_block              = var.public-subnet-one
  availability_zone       = var.zone-one
  map_public_ip_on_launch = true

  tags = merge(local.public-tags, { Name = "reelcruit-public-subnet-one" })
}

resource "aws_subnet" "reelcruit-public-subnet-two" {
  vpc_id                  = aws_vpc.reelcruit-vpc.id
  cidr_block              = var.public-subnet-two
  availability_zone       = var.zone-two
  map_public_ip_on_launch = true

  tags = merge(local.public-tags, { Name = "reelcruit-public-subnet-two" })
}
