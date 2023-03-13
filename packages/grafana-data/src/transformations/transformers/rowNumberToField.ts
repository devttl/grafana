import { map } from 'rxjs/operators';

import { DataFrame, Field, FieldType } from '../../types/dataFrame';
import { DataTransformerInfo } from '../../types/transformations';
import { ArrayVector } from '../../vector';

import { DataTransformerID } from './ids';

export interface RowNumberToFieldTransformerOptions {}

export const rowNumberToFieldTransformer: DataTransformerInfo<RowNumberToFieldTransformerOptions> = {
  id: DataTransformerID.rowNumberToField,
  name: 'Row number to column',
  description: 'Extract row number to column',
  defaultOptions: {},

  /**
   * Describe me here
   */
  operator: (options) => (source) =>
    source.pipe(
      map((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          return data;
        }

        return data.map((frame) => ({
          ...frame,
          fields: renumberer(frame),
        }));
      })
    ),
};

const renumberer = (frame: DataFrame): Field[] => {
  const rowNumberFieldIndex = frame.fields.findIndex((field) => field.name === 'row number');
  const rowNumbers = frame.fields[0].values.toArray().map((_, index) => index + 1);

  const newField = {
    name: 'row number',
    type: FieldType.number,
    values: new ArrayVector(rowNumbers),
    config: {},
  };

  if (rowNumberFieldIndex > -1) {
    frame.fields[rowNumberFieldIndex] = newField;
  } else {
    frame.fields.unshift(newField);
  }

  return frame.fields;
};