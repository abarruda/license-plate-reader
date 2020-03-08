#dd if=/dev/zero of=/var/swap_memory.img bs=1024k count=512

mkswap /var/swap_memory.img

chmod 0600 /var/swap_memory.img

swapon /var/swap_memory.img
