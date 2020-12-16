echo "[Build] Package: $PACKAGE"

if [ "$PACKAGE" = "admin" ]
then
  echo "No build script"
elif [ "$PACKAGE" = "gateway" ]
then
  echo "Building API Gateway"
  cd packages/gateway;
  yarn build;
else
  echo "Build Everything"
  cd packages/gateway;
  yarn build;
  cd ../frontend;
  yarn build;
fi