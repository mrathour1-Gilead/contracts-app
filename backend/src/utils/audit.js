export const generateAuditChanges = (oldSection = {}, newSection = {}, sectionName) => {

  const changes = []

  Object.keys(newSection).forEach((field) => {

    const oldValue = oldSection[field]?.value ?? null
    const newValue = newSection[field]?.value ?? null

    if (oldValue !== newValue) {

      changes.push({
        section: sectionName,
        field,
        from: oldValue,
        to: newValue
      })

    }

  })

  return changes
}