const buildTreeChildren = function (datasets, id, openedList) {
  const nodes = []

  datasets.forEach(d => {
    if (d.parent_id === id) {
      const node = {
        data: d,
        children: buildTreeChildren(datasets, d.id, openedList),
        text: d.name,
        id: d.id,
        state: {
          expanded: openedList.includes(d.id)
        }
      }

      nodes.push(node)
    }
  })

  return nodes
}

/**
 * Build a tree from a list of flat dataset list
 *
 * @param datasets
 * @param root
 * @param openedList array of the dataset id to be set opened in the tree view
 * @returns {Array}
 */
const buildTreeFromFlatArray = function (datasets, root, openedList = []) {
  const nodes = []

  nodes.push({
    data: root,
    children: buildTreeChildren(datasets, root.id, openedList),
    text: root.name,
    id: root.id,
    state: {
      expanded: openedList.includes(root.id)
    }
  })

  return nodes
}

export {
  buildTreeChildren,
  buildTreeFromFlatArray
}
