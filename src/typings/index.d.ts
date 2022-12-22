/*
 * @Author: jrucker
 * @Description: 类型声明
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/20 10:38:47
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
