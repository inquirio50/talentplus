# create Elastic file system
resource "aws_efs_file_system" "reelcruit-efs" {
  creation_token = "reelcruit-efs"
  encrypted      = true
  kms_key_id     = aws_kms_key.reelcruit-kms.arn

  tags = {
    Name = "reelcruit-efs-file-system"
  }
}

# set first mount target for the EFS to Datalayer
resource "aws_efs_mount_target" "datalayer-subnet-mount" {
  file_system_id  = aws_efs_file_system.reelcruit-efs.id
  subnet_id       = aws_subnet.reelcruit-datalayer-subnet.id
  security_groups = [aws_security_group.reelcruit-datalayer-sg.id]
}

# create access point for the EFS
resource "aws_efs_access_point" "reelcruit-mt" {
  file_system_id = aws_efs_file_system.reelcruit-efs.id

  posix_user {
    gid = 0
    uid = 0
  }

  root_directory {
    path = "/reelcruit"

    creation_info {
      owner_gid   = 0
      owner_uid   = 0
      permissions = 0755
    }
  }
}