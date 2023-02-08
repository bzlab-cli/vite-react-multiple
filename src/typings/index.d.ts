/*
 * @Author: jrucker
 * @Description: 类型声明
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/06 15:22:37
 */

declare module '*.png'
declare module '*.jpg'
declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;
  const src: string;
  export default src;
}

type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
