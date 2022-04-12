FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs/

#copy angular dist folder to container 
COPY --chown=www-data:www-data ./dist .

#copy htaccess and httpd.conf to container
COPY --chown=www-data:www-data ./docker/.htaccess .htaccess
COPY --chown=www-data:www-data ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

#change permissions
RUN chmod -R 755 .

#expose port
EXPOSE 80