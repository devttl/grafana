import { firstValueFrom } from 'rxjs';

import { toDataFrame } from '../../dataframe';
import { DataTransformerConfig, FieldType } from '../../types';
import { mockTransformationsRegistry } from '../../utils/tests/mockTransformationsRegistry';
import { ArrayVector } from '../../vector';
import { transformDataFrame } from '../transformDataFrame';

import { DataTransformerID } from './ids';
import { rowNumberToFieldTransformer, RowNumberToFieldTransformerOptions } from './rowNumberToField';

describe('OrganizeFields Transformer', () => {
  beforeAll(() => {
    mockTransformationsRegistry([rowNumberToFieldTransformer]);
  });

  describe('when consistent data is received', () => {
    const data = toDataFrame({
      name: 'A',
      fields: [{ name: 'temperature', type: FieldType.number, values: [10.3, 10.4, 10.5, 10.6] }],
    });

    it('should order and filter according to config', async () => {
      const cfg: DataTransformerConfig<RowNumberToFieldTransformerOptions> = {
        id: DataTransformerID.rowNumberToField,
        options: {},
      };

      await expect(transformDataFrame([cfg], [data])).toEmitValuesWith((received) => {
        const data = received[0];
        const organized = data[0];
        expect(organized.fields).toEqual([
          {
            config: {},
            name: 'row number',
            type: FieldType.number,
            values: new ArrayVector([1, 2, 3, 4]),
          },
          {
            config: {},
            name: 'temperature',
            type: FieldType.number,
            values: new ArrayVector([10.3, 10.4, 10.5, 10.6]),
          },
        ]);
      });
    });

    it('handles repeated transformations correctly', async () => {
      // console.log('whats even happening');
      const cfg: DataTransformerConfig<RowNumberToFieldTransformerOptions> = {
        id: DataTransformerID.rowNumberToField,
        options: {},
      };
      const inputs = toDataFrame({
        name: 'A',
        fields: [
          {
            name: 'row number',
            type: FieldType.number,
            values: [1, 2, 3, 4],
          },
          {
            name: 'temperature',
            type: FieldType.number,
            values: [10.3, 10.4, 10.5, 10.6],
          },
        ],
      });
      // const transformed =
      // expect(true).toBeTruthy();

      await expect(transformDataFrame([cfg], [inputs])).toEmitValuesWith((received) => {
        const data = received[0];
        const organized = data[0];
        expect(organized.fields).toEqual([
          {
            config: {},
            name: 'row number',
            type: FieldType.number,
            values: new ArrayVector([1, 2, 3, 4]),
          },
          {
            config: {},
            name: 'temperature',
            type: FieldType.number,
            values: new ArrayVector([10.3, 10.4, 10.5, 10.6]),
          },
        ]);
      });
    });

    it('updates row count when data changes', async () => {
      const cfg: DataTransformerConfig<RowNumberToFieldTransformerOptions> = {
        id: DataTransformerID.rowNumberToField,
        options: {},
      };
      const inputs = toDataFrame({
        name: 'A',
        fields: [
          {
            name: 'row number',
            type: FieldType.number,
            values: [1],
          },
          {
            name: 'temperature',
            type: FieldType.number,
            values: [10.3, 10.4, 10.5, 10.6],
          },
        ],
      });

      await expect(transformDataFrame([cfg], [inputs])).toEmitValuesWith((received) => {
        const data = received[0];
        const organized = data[0];
        expect(organized.fields).toEqual([
          {
            config: {},
            name: 'row number',
            type: FieldType.number,
            values: new ArrayVector([1, 2, 3, 4]),
          },
          {
            config: {},
            name: 'temperature',
            type: FieldType.number,
            values: new ArrayVector([10.3, 10.4, 10.5, 10.6]),
          },
        ]);
      });
    });
  });
});