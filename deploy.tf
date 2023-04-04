terraform {
    required_providers {
        civo = {
            source  = "civo/civo"
            version = "1.0.31"
            # Use the last available version
        }
    }
    backend "s3" {
        endpoint                    = "https://objectstore.nyc1.civo.com"
        bucket                      = "states"
        key                         = "api.tfstate"
        region                      = "NYC1"
        skip_region_validation      = true
        skip_credentials_validation = true
        skip_metadata_api_check     = true
        force_path_style            = true
    }
}

variable "name" {}
variable "tag" {}
variable "host" {}
variable "token" {}
variable "openai_api_key" {}

data "civo_kubernetes_cluster" "my-cluster" {
    name = "sandbox"
}

provider "kubernetes" {
    host     = data.civo_kubernetes_cluster.my-cluster.api_endpoint
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
            PORT           = 8080
            DB_HOST        = "mysql"
            DB_PORT        = 3306
            DB_USERNAME    = "changeme"
            DB_PASSWORD    = "changeme"
            OPENAI_API_KEY = var.openai_api_key
        }
    }
}

module "deploy" {
    source   = "github.com/convictionsai/terraform-kubernetes-deployment.git?ref=0.0.2"
    settings = local.settings
}

