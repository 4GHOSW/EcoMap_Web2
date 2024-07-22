interface Props {
  column: any
  data: any
}

const BaseTable = ({ column, data }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {Object.keys(column).map((key: string) => (
            <th key={key} className="border-borderColor break-words border-b bg-tertiary-surface10 py-3 text-center text-desc2 font-bold leading-5 text-typo-300">
              {column[key]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((x: any, i: number) => (
          <tr key={'tr' + i}>
            {Object.keys(column).map((key: string) => {
              return (
                <td
                  key={'td' + key + i}
                  className="border-borderColor divide-gray-300 whitespace-nowrap break-words border-b bg-white px-4 py-4 text-center text-body leading-4 text-typo-500"
                >
                  {x[key]}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BaseTable
