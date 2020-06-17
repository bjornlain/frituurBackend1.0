variable "vsphere_IP" {
  default = "192.168.209.2"
}

variable "vsphere_name" {
  default = "codious-maximus-dev"
}

variable "vsphere_disk_size" {
  default = 30
}

variable "vsphere_memory" {
  default = 4096
}

variable "vsphere_num_cpus" {
  default = 2
}

#Vaste variablen

variable "vsphere_allow_unverified_ssl" {
  default = true
}

variable "vsphere_server" {
  default = "vcenter.cloudious.io"
}

variable "vsphere_user" {
  default = "administrator@vsphere.local"
}

variable "vsphere_password" {
  default = "XmG*3A9q"
}

variable "vsphere_host" {
  default = "vs3.cloudious.io"
}

variable "vsphere_datacenter" {
  default = "Eindhoven"
}

variable "vsphere_cluster" {
  default ="Cloudious"
}

variable "vsphere_datastore" {
  default = "MSA_DS1"
}

variable "vsphere_domain" {
  default = "codious.io"
}

variable "vsphere_folder" {
  default = "Codious/Development"
}

variable "vsphere_network" {
  default = "Codious-Development"
}

variable "vsphere_ipv4_netmask" {
  default = 24
}

variable "vsphere_dns_server_list" {
  default = ["192.168.210.220", "192.168.210.220"]
  type = "list"
}

variable "vsphere_disk_label" {
  default = "disk0"
}

variable "vsphere_resource_pool" {
  default = "Cloudious.io/Resources"
}

variable "vsphere_template" {
  default = "vm-centos7-temp"
}

variable "vsphere_time_zone" {
  default = "Europe/Brussels"
}
