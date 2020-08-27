@echo off

cls

echo Cordova Preper
echo By AceiusIO
color 01

cordova prepare

cordova serve

echo Done.

timeout 3
EXIT /B