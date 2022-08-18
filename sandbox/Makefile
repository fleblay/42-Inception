RUNNING_CONTAINERS	:= $(shell docker ps -q)
ALL_CONTAINERS		:= $(shell docker ps -a -q)

stop-all :
ifneq ($(strip $(RUNNING_CONTAINERS)), )
	docker stop $(RUNNING_CONTAINERS)
else
	@echo nothing to be stopped
endif

rm-all :
ifneq ($(strip $(ALL_CONTAINERS)), )
	docker rm $(ALL_CONTAINERS)
else
	@echo nothing to be removed
endif

clean :
	docker system prune --volumes
