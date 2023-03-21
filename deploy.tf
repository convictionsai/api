terraform {

    backend "gcs" {

        bucket = "matthewdavis-sandbox-infra"
        prefix = "nvrai/dev/cameras.tfstate"

    }

}

variable "host" {}
variable "token" {}
variable "image" {}
variable "env" {}
variable "name" {

    default = "cameras"

}
provider "kubernetes" {

    host     = var.host
    token    = var.token
    insecure = true

}

locals {

    env = yamldecode(var.env)

}

resource "kubernetes_deployment" "deployment" {

    metadata {

        name      = var.name
        namespace = "nvrai"

        labels = {

            app = var.name

        }

    }

    spec {

        replicas = 1

        selector {

            match_labels = {

                app = var.name

            }

        }

        template {

            metadata {

                name = var.name

                labels = {

                    app = var.name

                }

            }

            spec {

                termination_grace_period_seconds = 0

                image_pull_secrets {

                    name = "gcr-image-pull"

                }

                node_selector = {

                    role = "services"

                }

                container {

                    name  = var.name
                    image = var.image

                    port {

                        container_port = 8080
                        protocol       = "TCP"

                    }

                    resources {

                        requests = {

                            cpu    = "100m"
                            memory = "50Mi"

                        }

                        limits = {

                            cpu    = "500m"
                            memory = "300Mi"

                        }

                    }

                    dynamic "env" {

                        for_each = local.env

                        content {

                            name  = env.key
                            value = env.value

                        }

                    }

                }

            }

        }

    }

}

resource "kubernetes_service" "service" {

    metadata {

        name      = var.name
        namespace = "nvrai"

        labels = {

            app = var.name

        }

    }

    spec {

        selector = {

            app = var.name

        }

        port {

            port        = 8080
            target_port = 8080
            protocol    = "TCP"

        }

    }

}

