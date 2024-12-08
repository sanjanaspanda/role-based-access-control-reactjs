@echo off
set "output=exported_content.txt"

:: Clear the output file if it exists
> "%output%" echo.

:: Recursive function to process all files
for /r %%F in (*) do (
    echo Processing %%F...

    :: Append the filename and relative path
    echo --------- >> "%output%"
    echo %%~fF >> "%output%"

    :: Append the file contents
    type "%%F" >> "%output%"
    echo. >> "%output%"  :: Add a blank line after the content
)

echo Export completed. All content saved to "%output%".
pause
