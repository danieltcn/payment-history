import { NotFoundException } from '@nestjs/common';

export const verifyEntityExistence = async <T>(
  fn: () => Promise<T | undefined>,
  exceptionMessage?: string,
): Promise<T> => {
  return fn().then((result) => {
    if (!result) {
      throw new NotFoundException(exceptionMessage);
    }

    return result;
  });
};
