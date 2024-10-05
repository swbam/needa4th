const csvData = `Date,Location,Time,# of Players,Organizer,Attendee
2024-02-29,Towhee,15:45,4,Parker Smith,Parker Smith
2024-03-02,Henry Horton,14:00,4,Parker Smith,Jesus Rios
2024-03-03,Henry Horton,13:10,4,Parker Smith,Bob Murray
2024-03-04,Henry Horton,15:30,4,Dominic Nanni,Jesus Rios
2024-03-11,Mccabe,15:30,4,Dominic Nanni,Jesus Rios
2024-03-13,Mccabe,15:50,4,Parker Smith,Jesus Rios
2024-03-14,Harpeth Hills,16:30,4,Parker Smith,Jesus Rios
2024-03-17,Harpeth Hills,13:00,4,Parker Smith,Seth Bambling
2024-03-19,Towhee,17:00,4,Parker Smith,Kyle McFarland
2024-03-21,Cheekwood,16:30,4,Parker Smith,Jesus Rios`;

const parseCSV = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index];
      return obj;
    }, {});
  });
};

export const teeTimes = parseCSV(csvData);

const usersData = `Parker Smith,parkerjaysmith@gmail.com,Henry Horton,74.3
Dominic Nanni,Dnanni232@gmail.com,Mccabe,67.6
Connor Stanley,Connormstanley94@gmail.com,Harpeth Hills,73.5
Jesus Rios,Jayrios.94@gmail.com,Ted Rhodes,72.2
Derek Kozakiewicz,Derek.kozak@gmail.com,Towhee,72.8
Jackson Smith,smithjackson35@gmail.com,Franklin Bridge,71.9
Bob Murray,bmurray@nashvillewire.com,Little Course,N/A
Mike Brooks,mikeb1120@gmail.com,Nashboro,73.2
Andrew Rocco,Andrewrocco.golf@gmail.com,Old Fort,73.7
Heath Mansfield,Heathmansfield42@gmail.com,Cheekwood,63.1
Lane Hostettler,Lane925@gmail.com,Hermitage (Presidents),73.9
Josh Alcala,josha38@gmail.com,Shelby,N/A
Richard Caruso,Richard.caruso_1995@yahoo.com,Two Rivers,71.4
Martin Clayton,Martin@regimentconstructionllc.com,Percy Warner,N/A
Salvador Guzman,sguzmanx7@gmail.com,Gaylord,73.1
Jason Story,jlsstory@bellsouth.net,Hermitage (Generals),72.3
Nathan Bateman,nbateman123@gmail.com,Montgomery Bell,72.9
Seth Bambling,seth@bambl.ing,Greystone,73.2
Josh Link,Joshlink3@gmail.com,,
Chris Baker,chris@towheeclub.com,,
Kyle McFarland,klmcfrlnd@gmail.com,,
Gilmore Connors,Gilmore.conners@gmail.com,,
Alex York,alexyork225@gmail.com,,
Guest,,,
John Shrader,sharder@richlandbuildersllc.com,,`;

export const users = usersData.split('\n').map(line => {
  const [name, email, homeCourse, rating] = line.split(',');
  return { name, email, homeCourse, rating: rating !== 'N/A' ? parseFloat(rating) : null };
});
