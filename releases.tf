# resource "helm_release" "nginx-ingress-controller" {
#   name      = "nginx-ingress-controller"
#   namespace = "default"
#   chart     = "ingress-nginx/ingress-nginx"
#   version   = "4.6.0"


#   depends_on = [
#     null_resource.add_repos
#   ]
# }

# resource "helm_release" "ingress-cert-manager" {
#   name      = "ingress-cert-manager"
#   namespace = "cert-manager"
#   chart     = "jetstack/cert-manager"
#   version   = "v1.8.2"

#   set {
#     name  = "installCRDs"
#     value = true
#   }

#   depends_on = [
#     null_resource.add_repos
#   ]
# }
