const IGNORE_KEYS = ["sno"];

export const generateAuditChanges = (oldSection = {}, newSection = {}, sectionName) => {
  const changes = [];

  Object.keys(newSection).forEach((field) => {
    const oldField = oldSection[field] || {};
    const newField = newSection[field] || {};

    const fieldDiff = {};

    Object.keys(newField).forEach((key) => {
      if (IGNORE_KEYS.includes(key)) return;

      const oldValue = oldField[key] ?? null;
      const newValue = newField[key] ?? null;

      if (oldValue !== newValue) {
        fieldDiff[key] = {
          from: oldValue,
          to: newValue,
        };
      }
    });

    if (Object.keys(fieldDiff).length > 0) {
      changes.push({
        section: sectionName,
        field,
        changes: fieldDiff,
      });
    }
  });

  return changes;
};