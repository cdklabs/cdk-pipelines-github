import * as path from 'path';

export function posixPath(windowsOrPosixPath: string): string {
  return windowsOrPosixPath.split(path.sep).join(path.posix.sep);
}
