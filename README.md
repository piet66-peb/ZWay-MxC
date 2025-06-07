
[![](MxC/htdocs/icon.png)](https://github.com/piet66-peb?tab=repositories)

# MxC Optional helper module for module MxChartDB

Purpose of this module: define global constants for all charts and store them into a database table for common access.

The values of global constants defined by this module can be obtained in the chart formulas with the function call 

    MxC(constant name[, x0])

It's possible to define
- the constant name
- the constant value
- a date+time: valdidity of this definition (starting from)
- a comment

All constants can be defined several times with different values and different scopes of validity.

## Prerequisites

Z-Way.

## Installation

- download the package from the Z-Way App Store

or download it with wget and do a restart of z_way_server:
```sh
url=https://github.com/piet66-peb/ZWay-MxC/raw/refs/heads/main/download_MxC.bash
cd /tmp; wget -q -O - $url | sudo bash

```

## License: MIT

Copyright © 2024 piet66

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

