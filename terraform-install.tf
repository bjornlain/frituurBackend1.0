provider "vsphere" {
    user                  = "${var.vsphere_user}"
    password              = "${var.vsphere_password}"
    vsphere_server        = "${var.vsphere_server}"
    allow_unverified_ssl  = "${var.vsphere_allow_unverified_ssl}"
}

resource "vsphere_virtual_machine" "vm_dev" {
    name                = "${var.vsphere_name}"
    resource_pool_id    = data.vsphere_compute_cluster.cluster.resource_pool_id
    datastore_id        = data.vsphere_datastore.datastore.id
    host_system_id      = data.vsphere_host.host.id
    folder              = "${var.vsphere_folder}"

    num_cpus  = "${var.vsphere_num_cpus}"
    memory    = "${var.vsphere_memory}"
    guest_id  = "centos7_64Guest"
    scsi_type = "${data.vsphere_virtual_machine.template.scsi_type}"

    network_interface {
        network_id    = data.vsphere_network.network.id
        adapter_type  = "${data.vsphere_virtual_machine.template.network_interface_types[0]}"
    }

    disk {
        label             = "${var.vsphere_disk_label}"
        size              = "${var.vsphere_disk_size}"
        eagerly_scrub     = data.vsphere_virtual_machine.template.disks.0.eagerly_scrub
        thin_provisioned  = data.vsphere_virtual_machine.template.disks.0.thin_provisioned
    }

    provisioner "remote-exec" {
    connection {
      type = "ssh"
      password = "XmG*3A9q"
      user = "administrator"
      host = "${var.vsphere_IP}"
    }
    scripts = ["script.sh"]
  }
    clone {
    template_uuid = data.vsphere_virtual_machine.template.id

    customize {
      linux_options {
        host_name = "${var.vsphere_name}"
        domain    = "${var.vsphere_domain}"
      }

      network_interface {
        ipv4_address = "${var.vsphere_IP}"
        ipv4_netmask = "${var.vsphere_ipv4_netmask}"

      }

      ipv4_gateway    = "192.168.209.254"
      dns_server_list = "${var.vsphere_dns_server_list}"
    }
  }
}
