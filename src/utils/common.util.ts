/**
 * 暂停
 * @param time 暂停时间：ms
 */
export function sleep(time: number) {
  return new Promise<undefined>(resolve => setTimeout(resolve, time))
}
