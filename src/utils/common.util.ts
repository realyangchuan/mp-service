/**
 * 暂停
 * @param time 暂停时间：ms
 * @returns Promise<undefined>
 */
export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
