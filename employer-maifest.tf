
# resource "kubernetes_service" "reelcruit-employer-svc" {
#   metadata {
#     name      = "employerfrontendservice"
#     namespace = "devel"

#     labels = {
#       app = "employerfrontend"
#     }

#     # annotations = {
#     #   "service.beta.kubernetes.io/aws-load-balancer-backend-protocol" = "http"
#     #   "service.beta.kubernetes.io/aws-load-balancer-ssl-cert"        = "arn:aws:acm:ca-central-1:054550991362:certificate/dde505d8-55ad-47c2-8a99-f21c2fd3bbd0"
#     #   "service.beta.kubernetes.io/aws-load-balancer-ssl-ports"       = "https"
#     # }
#   }

#   spec {
#     type = "LoadBalancer"

#     selector = {
#       app = "employerfrontend"
#     }

#     port {
#       name       = "http"
#       protocol   = "TCP"
#       port       = 80
#       target_port = 80
#     }

#     port {
#       name       = "https"
#       protocol   = "TCP"
#       port       = 443
#       target_port = 443
#     }
#   }
# }

# resource "kubernetes_deployment" "reelcruit-employer" {
#   metadata {
#     name = "employerfrontendservice"
#     namespace = "devel"

#     labels = {
#       app = "employerfrontend"
#     }
#   }

#   spec {
#     selector {
#       match_labels = {
#         app = "employerfrontend"
#       }
#     }

#     replicas = 1

#     # strategy {
#     #   type = "RollingUpdate"
#     # }

#     template {
#       metadata {
#         labels = {
#           app = "employerfrontend"
#         }
#       }

#       spec {
#         container {
#           name  = "employerfrontend"
#           image = "scinet0786/reelcruit-app-fe:latest"

#           port {
#             container_port = 80
#             protocol      = "TCP"
#           }

#           port {
#             container_port = 443
#             protocol      = "TCP"
#           }

#         #   imagePullPolicy = "Always"

#           resources {
#             limits = {
#               cpu    = "500m"
#               memory = "1000Mi"
#             }

#             requests = {
#               cpu    = "300m"
#               memory = "500Mi"
#             }
#           }
#         }

#         node_selector = {
#           "topology.kubernetes.io/zone" = "us-east-1a"
#         }
#       }
#     }
#   }
# }