# ident

TypeScript library for generating highly recognizable identicons.


## Usage

> basic React example

``` jsx
import React from 'react'
import { base64Svg } from '@onerbs/ident'

export default function Avatar({ value, size }) {
  return (
    <img
      src={base64Svg(value, size)}
      alt={`${value}'s avatar`}
    />
  )
}
```


## Acknowledgments

This project is a port of [jdenticon](https://github.com/dmester/jdenticon) :tada:
