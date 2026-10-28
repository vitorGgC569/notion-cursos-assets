terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "unix:///tmp/docker.sock"
}

variable "ambiente" {
  type        = string
  description = "Nome do ambiente (dev, hom ou prod)"
  default     = "dev"
  validation {
    condition     = contains(["dev", "hom", "prod"], var.ambiente)
    error_message = "ambiente deve ser dev, hom ou prod."
  }
}

variable "porta" {
  type    = number
  default = 15803
}

resource "local_file" "config" {
  filename = "${path.module}/saida/app-${var.ambiente}.conf"
  content  = "ambiente=${var.ambiente}\nporta=${var.porta}\n"
}

resource "docker_image" "nginx" {
  name         = "nginx:1.30-alpine"
  keep_locally = true
}

resource "docker_container" "web" {
  name  = "m8do-tf-web-${var.ambiente}"
  image = docker_image.nginx.image_id
  ports {
    internal = 80
    external = var.porta
  }
  labels {
    label = "ambiente"
    value = var.ambiente
  }
}

output "url" {
  value = "http://localhost:${var.porta}"
}
