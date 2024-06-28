type ResultCountProps = {
  totalNumberOfResuts: number
}

export default function ResultsCount({ totalNumberOfResuts }: ResultCountProps) {
  return <p className="count">
   <span className="u-bold">{totalNumberOfResuts}</span> results
  </p>;
}
