import timeago from 'timeago.js'

export function moment(date) {
  if (!date) {
    return 'N/A'
  }
  return new timeago().format(date);
}
