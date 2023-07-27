variable "vpc-cidr-block" {
  type    = string
  default = "100.0.0.0/16"
}

variable "region" {
  description = "The region for the network."
  type        = string
  default     = "eu-west-1"
}

variable "zone-one" {
  description = "The availability zone for the network."
  type        = string
  default     = "eu-west-1a"
}

variable "zone-two" {
  description = "The availability zone for the network."
  type        = string
  default     = "eu-west-1b"
}

# variable "zones" {
#   description = "The availability zone for the network."
#   type        = list(string)
#   default     = ["ca-central-1a", "ca-central-1b" ]
# }

variable "public-subnet-one" {
  type    = string
  default = "100.0.1.0/24"
}

variable "public-subnet-two" {
  type    = string
  default = "100.0.2.0/24"
}

variable "private-subnet-one" {
  type    = string
  default = "100.0.3.0/24"
}

variable "private-subnet-two" {
  type    = string
  default = "100.0.4.0/24"
}

variable "datalayer-subnet" {
  type    = string
  default = "100.0.5.0/24"
}

variable "bucket-name" {
  description = "The region for the network."
  type        = string
  default     = "reelcruit-state-bucket-prod"
}

variable "s3-bucket-acl" {
  type    = string
  default = "public-read"
}


# RDS
variable "engine" {
  type    = string
  default = "postgres"
}

variable "engine-version" {
  type    = string
  default = "14.1"
}

variable "instance-class" {
  type    = string
  default = "db.t2.micro"
}

variable "db-name" {
  type    = string
  default = "reelcruit-db"
}

variable "username" {
  type    = string
  default = "postgres"
}

variable "password" {
  type      = string
  default   = "postgres"
  sensitive = true
}

variable "allocated_storage" {
  type    = number
  default = 20
}

variable "storage_type" {
  type    = string
  default = "gp2"
}

variable "backup_retention_period" {
  type    = number
  default = 7
}

variable "final_snapshot_identifier" {
  type    = string
  default = "reelcruit-db-snapshot"
}

variable "namespaces" {
  description = "Namespaces"
  type        = list(string)
  default = [
    "test",
    "staging",
    "production",
    "prometheus"
  ]
}