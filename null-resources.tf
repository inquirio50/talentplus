# resource "null_resource" "add_repos" {
#   for_each = toset(var.repositories)

#   provisioner "local-exec" {
#     command = "helm repo add ${each.value}"
#   }

#   depends_on = [
#     kubernetes_namespace.namespaces
#   ]
# }

# ---
# resource "null_resource" "cluster_issuer" {

#   provisioner "local-exec" {
#     command = "kubectl apply -n cert-manager -f ./sources/tls-ssl/letsencrypt-staging.yaml"
#   }

#   provisioner "local-exec" {
#     command = "kubectl apply -n cert-manager -f ./sources/tls-ssl/letsencrypt-production.yaml"
#   }

#   depends_on = [
#     helm_release.ingress-cert-manager
#   ]
# }
