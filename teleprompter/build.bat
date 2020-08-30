@echo off

cls

echo Cordova Preper
echo By AceiusIO

cordova prepare

cordova serve

echo Done.

timeout 3
EXIT /B