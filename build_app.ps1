$option = $args[0]
if ($option -eq 'test') {
    write-host "Running Tests..."
    docker-compose -f docker-compose.dev.yml run --rm app sh -c "python manage.py test" 
} elseif ($option -eq 'migrate') {
    write-host "Running Migrations..."
    docker-compose -f docker-compose.dev.yml run app sh -c "python manage.py makemigrations"
} elseif ($option -eq  'prod') {
    write-host "Running Production-like Environment..."
    docker-compose up --build
} elseif ($option -eq 'prod_check') {
    write-host "Testing Django for production..."
    docker-compose run --rm app sh -c "python manage.py check --deploy"
} else {
    docker-compose -f docker-compose.dev.yml up --build
}
