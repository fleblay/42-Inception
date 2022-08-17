FROM centos:7
ONBUILD ARG fichier="app.py"
ONBUILD COPY $fichier /app/app.py
ONBUILD RUN python -m py_compile /app/app.py
ENTRYPOINT ["python", "/app/app.pyc"]
