# Private Subnets 
resource "aws_subnet" "reelcruit-private-subnet-one" {
  vpc_id                  = aws_vpc.reelcruit-vpc.id
  cidr_block              = var.private-subnet-one
  availability_zone       = var.zone-one
  map_public_ip_on_launch = false

  tags = merge(local.private-tags, { Name = "reelcruit-private-subnet-one" })
}

resource "aws_subnet" "reelcruit-private-subnet-two" {
  vpc_id                  = aws_vpc.reelcruit-vpc.id
  cidr_block              = var.private-subnet-two
  availability_zone       = var.zone-two
  map_public_ip_on_launch = false

  tags = merge(local.private-tags, { Name = "reelcruit-private-subnet-two" })
}

resource "aws_subnet" "reelcruit-datalayer-subnet" {
  vpc_id                  = aws_vpc.reelcruit-vpc.id
  cidr_block              = var.datalayer-subnet
  map_public_ip_on_launch = false
  availability_zone       = var.zone-one

  tags = { Name = "reelcruit-datalayer-subnet" }
}

