/**
 * 현재 날짜 기준으로 방금전/분전/시간전/일전/주전/달전/년전을 리턴하는 기능
 * @params {string} value 현재 시간
 * @return {string} 방금전/분전/시간전/주전/일전/달전/년전
 */
export const timeFromToday = (value: string) => {
  const today = new Date()
  const timeValue = new Date(value)

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  )
  if (betweenTime < 1) return "방금전"
  if (betweenTime < 60) {
    return `${betweenTime}분전`
  }

  const betweenTimeHour = Math.floor(betweenTime / 60)
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
  if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일전`
  }
  const betweenTimeWeek = Math.floor(betweenTimeDay / 7)
  if (betweenTimeWeek <= 4 && betweenTimeDay < 30) {
    return `${betweenTimeWeek}주전`
  }
  const betweenTimeMonth = Math.floor(betweenTimeDay / 30)
  if (betweenTimeMonth <= 11) {
    return `${betweenTimeMonth}달전`
  } else if (betweenTimeMonth === 12 && betweenTimeDay < 365) {
    return `${11}달전`
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`
}
