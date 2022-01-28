import moment from "moment";

export const filterIssuesByDays = (issues) => {
  let filteredObj = {today: [], tomorrow: [], later: []}
  let today = moment();
  let tomorrow = moment().add(1, 'd');

  let sortedIssues = issues.sort((a, b) => {
    return moment(a.date, 'DD-MM-YYYY').diff(moment(b.date, 'DD-MM-YYYY'))
  });

  sortedIssues.forEach(issue => {
    if (moment(issue.date).isSame(today, 'd'))
      filteredObj.today.push(issue);

    if (moment(issue.date).isSame(tomorrow, 'd'))
      filteredObj.tomorrow.push(issue);

    if (moment(issue.date).isAfter(tomorrow, 'd'))
      filteredObj.later.push(issue);
  })

  return filteredObj;
}