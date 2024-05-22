export $(grep -v '^#' .env | xargs)
echo "Loading environment variables..."
