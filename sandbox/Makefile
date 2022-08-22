RUNNING_CONTAINERS	:= $(shell docker ps -q)
ALL_CONTAINERS		:= $(shell docker ps -a -q)
ALL_VOLUMES			:= $(shell docker volume ls -q)
ALL_NETWORK			:= $(shell docker network ls --filter type=custom -q)

all :
	docker compose up

build :
	docker compose build

stop :
	docker compose down

full-stop :
	docker compose down --rmi all --volumes

re : full-stop
	make all

stop-all :
ifneq ($(strip $(RUNNING_CONTAINERS)), )
	docker stop $(RUNNING_CONTAINERS)
else
	@echo No running containers to be stopped
endif

rm-all :
ifneq ($(strip $(ALL_CONTAINERS)), )
	docker rm $(ALL_CONTAINERS)
else
	@echo No containers to be removed
endif

rm-vol :
ifneq ($(strip $(ALL_VOLUMES)), )
	docker volume rm $(ALL_VOLUMES)
else
	@echo No volumes to be removed
endif

rm-net :
ifneq ($(strip $(ALL_NETWORK)), )
	docker network rm $(ALL_NETWORK)
else
	@echo No network to be removed
endif

#Delete unused containers, networks, dangling images (and unused volumes and images)
clean :
	docker system prune -f

fclean :
	docker system prune -f --volumes -a

# Warning : pas de TAB si ifneq ou ifeq dans une regle
