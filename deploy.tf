terraform {
    backend "s3" {
        endpoint = "https://objectstore.nyc1.civo.com"
        region = "us-east-1"
        bucket = "states"
        key = "convictionsai/dev/api.tfstate"
        prefix = "convictionsai/dev/api.tfstate"
    }
}

variable "host" {}
variable "token" {}
variable "tag" {}
variable "openai_api_key" {}
variable "name" {

    default = "cameras"

}
provider "kubernetes" {

    host     = var.host
    token    = var.token
    insecure = true

}

locals {
    settings = {
        name      = var.name
        namespace = "convictionsai"
        type      = "backend"
        version   = var.tag
        resources = {
            replicas = 1
            requests = {
                cpu    = "500m"
                memory = "500Mi"
            }
            limits = {
                cpu    = "500m"
                memory = "500Mi"
            }
        }
        networking = {
            ingress = {
                hostname = "api.convictions.ai"
                path     = "/"
            }
            ports = [
                {
                    name = "http"
                    port = 8080
                }
            ]
        }
        env = {
            PORT        = 8080
            DB_HOST     = "mysql"
            DB_PORT     = 3306
            DB_USERNAME = "changeme"
            DB_PASSWORD = "changeme"
            OPENAI_API_KEY = var.openai_api_key
        }
    }
}

module "deploy" {
    source   = "https://github.com/convictionsai/terraform-kubernetes-deployment.git?ref=0.0.2"
    settings = local.settings
}

