echo "[Preinstall] Package: $PACKAGE"

if [ "$PACKAGE" = "admin" ]
then
  echo "Preinstalling Forest Admin API"
  yarn preinstallAdmin
elif [ "$PACKAGE" = "gateway" ]
then
  echo "Preinstalling API Gateway"
  yarn preinstallGateway
else
  echo "Preinstalling Everything"
  yarn preinstallGateway && yarn preinstallAdmin && yarn preinstallFrontend
fi