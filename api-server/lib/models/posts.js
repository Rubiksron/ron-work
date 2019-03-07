'use strict';

class Posts  {

  constructor() {
    this.schema = {
      id: {required:true},
      author: {required:true},
      title: {required:true},
      article: {},
    };
    this.database = [];
  }

  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }
  

  count() {
    return this.database.length;
  }

  get(id) {
    return id ? this.database.filter( (record) => record.id === id ) : this.database;
  }

  post(entry) {
    entry.id = this.count() + 1;
    let record = this.sanitize(entry);
    if ( record.id ) { this.database.push(record); }
    return record;
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id );
    return this.get(id);
  }

  put(id, entry) {
    let record = this.sanitize(entry);
    if( record.id ) { this.database = this.database.map((item) => (item.id === id) ? record : item  ); }
    return this.get(id);
  }

}

module.exports = Posts;
