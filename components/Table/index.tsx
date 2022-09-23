interface Props {
  compact?: boolean,
  haveIDInHead?: boolean,

  headItems?: string[],
  bodyItems?: string[][],
  footItems?: string[],

  className?: string,
}

const Table = ({
  compact = false,
  haveIDInHead = false,
  headItems = [],
  bodyItems = [],
  footItems = [],
  className = '',
}: Props) => {
  function renderHead() {
    let items: Array<string> = [];
    if (haveIDInHead) {
      items.push('');
    }

    items = items.concat(headItems);

    return items.map((item, index) => {
      if (haveIDInHead && index === 0) {
        return (
          <th key={index}></th>
        );
      }

      return (
        <th key={index}>{item}</th>
      );
    });
  }

  function renderFoot() {
    let items: Array<string> = [];
    if (haveIDInHead) {
      items.push('');
    }

    items = items.concat(footItems);

    return items.map((item, index) => {
      if (haveIDInHead && index === 0) {
        return (
          <th key={index}></th>
        );
      }

      return (
        <th key={index}>{item}</th>
      );
    });
  }

  function renderBodyItem(items: string[]) {
    return items.map((item, index) => {
      return <td key={index}>{item}</td>
    });
  }

  function renderBody() {
    return bodyItems.map((item, index) => {
      return (
        <tr key={index} className='hover'>
          {renderBodyItem(item)}
        </tr>
      );
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className={`table w-full table-zebra ${compact ? 'table-compact' : ''}`}>
        <thead>
          <tr>
            {renderHead()}
          </tr>
        </thead>

        <tbody>
          {renderBody()}
        </tbody>

        <tfoot>
          <tr>
            {renderFoot()}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table;