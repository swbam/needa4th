const csvData = `Date,Location,Time,# of Players,Slot #,Walk / Ride,Organizer,Attendee
2/29/2024,Towhee,1545,4,1,Ride,Parker Smith,Parker Smith
2/29/2024,Towhee,1545,4,2,Ride,Parker Smith,Josh Link
3/2/2024,Henry Horton,1400,4,1,Ride,Parker Smith,Parker Smith
3/2/2024,Henry Horton,1400,4,2,Ride,Parker Smith,Jesus Rios
3/2/2024,Henry Horton,1400,4,3,Ride,Parker Smith,Josh Alcala
3/2/2024,Henry Horton,1400,4,4,Ride,Parker Smith,Dominic Nanni
3/3/2024,Henry Horton,1310,4,1,Ride,Parker Smith,Parker Smith
3/3/2024,Henry Horton,1310,4,2,Ride,Parker Smith,Bob Murray
3/4/2024,Henry Horton,1530,4,1,Ride,Dominic Nanni,Dominic Nanni
3/4/2024,Henry Horton,1530,4,2,Ride,Dominic Nanni,Jesus Rios
3/4/2024,Henry Horton,1530,4,3,Ride,Dominic Nanni,Derek Kozakiewicz
3/11/2024,Mccabe,1530,4,1,Walk,Dominic Nanni,Dominic Nanni
3/11/2024,Mccabe,1530,4,2,Walk,Dominic Nanni,Jesus Rios
3/11/2024,Mccabe,1530,4,3,Walk,Dominic Nanni,Derek Kozakiewicz
3/13/2024,Mccabe,1550,4,1,Ride,Parker Smith,Parker Smith
3/13/2024,Mccabe,1550,4,2,Ride,Parker Smith,Jesus Rios
3/13/2024,Mccabe,1550,4,3,Ride,Parker Smith,Josh Alcala
3/14/2024,Harpeth Hills,1630,4,1,Walk,Parker Smith,Parker Smith
3/14/2024,Harpeth Hills,1630,4,2,Walk,Parker Smith,Jesus Rios
3/17/2024,Harpeth Hills,1300,4,1,Ride,Parker Smith,Parker Smith
3/17/2024,Ted Rhodes,1300,4,2,Ride,Parker Smith,Seth Bambling
3/17/2024,Ted Rhodes,1300,4,3,Ride,Parker Smith,Andrew Rocco
3/17/2024,Towhee,1300,4,4,Ride,Parker Smith,Parker Smith
3/19/2024,Towhee,1700,4,1,Ride,Parker Smith,Parker Smith
3/19/2024,Towhee,1700,4,2,Ride,Parker Smith,Kyle McFarland
3/19/2024,Towhee,1700,4,3,Ride,Parker Smith,Jesus Rios
3/19/2024,Cheekwood,1700,4,4,Ride,Parker Smith,Derek Kozakiewicz
3/21/2024,Cheekwood,1630,4,1,Walk,Parker Smith,Parker Smith
3/21/2024,Cheekwood,1630,4,2,Walk,Parker Smith,Jesus Rios
3/21/2024,Cheekwood,1630,4,3,Walk,Parker Smith,Connor Stanley
3/21/2024,Ted Rhodes,1630,4,4,Walk,Parker Smith,Kyle McFarland
3/23/2024,Ted Rhodes,1150,4,1,Ride,Parker Smith,Parker Smith
3/23/2024,Ted Rhodes,1150,4,2,Ride,Parker Smith,Andrew Rocco
3/23/2024,Ted Rhodes,1150,4,3,Ride,Parker Smith,Dominic Nanni
3/27/2024,Franklin Bridge,1630,4,1,Walk,Parker Smith,Parker Smith
3/29/2024,Franklin Bridge,1600,4,1,Ride,Parker Smith,Parker Smith
3/29/2024,Franklin Bridge,1600,4,2,Ride,Parker Smith,Bob Murray
4/12/2024,Ted Rhodes,1610,4,1,Ride,Parker Smith,Parker Smith
4/12/2024,Harpeth Hills,1610,4,2,Ride,Parker Smith,Jesus Rios
4/12/2024,Harpeth Hills,1610,4,3,Ride,Parker Smith,Gilmore Connors
4/12/2024,Harpeth Hills,1610,4,4,Ride,Parker Smith,Connor Stanley
4/13/2024,Harpeth Hills,1020,4,1,Ride,Parker Smith,Parker Smith
4/13/2024,Harpeth Hills,1020,4,2,Ride,Parker Smith,Heath Mansfield
4/13/2024,Harpeth Hills,1020,4,3,Ride,Parker Smith,Richard Caruso
4/13/2024,Towhee,1020,4,4,Ride,Parker Smith,Derek Kozakiewicz
4/19/2024,Towhee,1620,4,1,Ride,Parker Smith,Parker Smith
4/19/2024,Towhee,1620,4,2,Ride,Parker Smith,Kyle McFarland
4/19/2024,Towhee,1620,4,3,Ride,Parker Smith,Guest
4/19/2024,Harpeth Hills,1620,4,4,Ride,Parker Smith,Guest
4/21/2024,Harpeth Hills,1220,4,1,Ride,Parker Smith,Parker Smith
4/21/2024,Harpeth Hills,1220,4,2,Ride,Parker Smith,Jesus Rios
4/21/2024,Harpeth Hills,1220,4,3,Ride,Parker Smith,Dominic Nanni
4/21/2024,Franklin Bridge,1220,4,4,Ride,Parker Smith,Seth Bambling
4/23/2024,Franklin Bridge,1230,4,1,Ride,Dominic Nanni,Dominic Nanni
4/23/2024,Franklin Bridge,1230,4,2,Ride,Dominic Nanni,Guest
4/25/2024,Franklin Bridge,320,4,1,Ride,Dominic Nanni,Dominic Nanni
4/25/2024,Hermitage (Presidents),320,4,2,Ride,Dominic Nanni,Derek Kozakiewicz
4/25/2024,Hermitage (Presidents),320,4,3,Ride,Dominic Nanni,Jesus Rios
4/26/2024,Harpeth Hills,1620,4,1,Ride,Parker Smith,Parker Smith
4/26/2024,Harpeth Hills,1620,4,2,Ride,Parker Smith,Jesus Rios
4/26/2024,Harpeth Hills,1620,4,3,Ride,Parker Smith,Jackson Smith
4/26/2024,Harpeth Hills,1620,4,4,Ride,Parker Smith,Guest
5/3/2024,Harpeth Hills,1620,4,1,Ride,Parker Smith,Parker Smith
5/3/2024,Harpeth Hills,1620,4,2,Ride,Parker Smith,Jesus Rios
5/4/2024,Harpeth Hills,1040,8,1,Ride,Parker Smith,Seth Bambling
5/4/2024,Harpeth Hills,1040,8,2,Ride,Parker Smith,Dominic Nanni
5/4/2024,Harpeth Hills,1040,8,3,Ride,Parker Smith,Connor Stanley
5/4/2024,Montgomery Bell,1040,8,4,Ride,Parker Smith,Kyle McFarland
5/4/2024,Montgomery Bell,1050,8,5,Ride,Parker Smith,Heath Mansfield
5/4/2024,Montgomery Bell,1050,8,6,Ride,Parker Smith,Jason Story
5/4/2024,Montgomery Bell,1050,8,7,Ride,Parker Smith,Richard Caruso
5/4/2024,Montgomery Bell,1050,8,8,Ride,Parker Smith,Parker Smith
5/11/2024,Montgomery Bell,1050,4,1,Ride,Parker Smith,Parker Smith
5/11/2024,Montgomery Bell,1050,4,2,Ride,Parker Smith,Heath Mansfield
5/11/2024,Montgomery Bell,1050,4,3,Ride,Parker Smith,Richard Caruso
5/11/2024,Franklin Bridge,1050,4,4,Ride,Parker Smith,Jason Story
5/19/2024,Franklin Bridge,1450,4,1,Ride,Parker Smith,Parker Smith
5/19/2024,Franklin Bridge,1450,4,2,Ride,Parker Smith,Bob Murray
5/19/2024,Franklin Bridge,1450,4,3,Ride,Parker Smith,John Shrader
5/19/2024,Harpeth Hills,1450,4,4,Ride,Parker Smith,Guest
5/23/2024,Harpeth Hills,1650,4,1,Ride,Parker Smith,Parker Smith
5/23/2024,Harpeth Hills,1650,4,2,Ride,Parker Smith,Derek Kozakiewicz
5/25/2024,Harpeth Hills,1200,4,1,Ride,Parker Smith,Parker Smith
5/25/2024,Harpeth Hills,1200,4,2,Ride,Parker Smith,Bob Murray
5/26/2024,Harpeth Hills,1300,4,1,Ride,Parker Smith,Seth Bambling
5/26/2024,Franklin Bridge,1300,4,2,Ride,Parker Smith,Derek Kozakiewicz
5/30/2024,Franklin Bridge,1650,4,1,Ride,Parker Smith,Parker Smith
5/30/2024,Towhee,1650,4,2,Ride,Parker Smith,Jesus Rios
5/30/2024,Towhee,1650,4,3,Ride,Parker Smith,Kyle McFarland
5/30/2024,Harpeth Hills,1650,4,4,Ride,Parker Smith,Lane Hostettler
6/4/2024,Harpeth Hills,1310,8,1,Ride,Derek Kozakiewicz,Derek Kozakiewicz
6/4/2024,Harpeth Hills,1310,8,2,Ride,Derek Kozakiewicz,Seth Bambling
6/4/2024,Harpeth Hills,1310,8,3,Ride,Derek Kozakiewicz,Andrew Rocco
6/4/2024,Greystone,1310,8,4,Ride,Derek Kozakiewicz,Chris Baker
6/4/2024,Greystone,1320,8,1,Ride,Derek Kozakiewicz,Parker Smith
6/4/2024,Greystone,1320,8,2,Ride,Derek Kozakiewicz,Connor Stanley
6/4/2024,Greystone,1320,8,3,Ride,Derek Kozakiewicz,Jesus Rios
6/4/2024,Greystone,1320,8,4,Ride,Derek Kozakiewicz,Dominic Nanni
6/8/2024,Greystone,1020,4,1,Ride,Parker Smith,Parker Smith
6/8/2024,Greystone,1020,4,2,Ride,Parker Smith,Heath Mansfield
6/8/2024,Greystone,1020,4,3,Ride,Parker Smith,Richard Caruso
6/8/2024,Ted Rhodes,1020,4,4,Ride,Parker Smith,Andrew Rocco
6/9/2024,Ted Rhodes,1300,4,1,Ride,Parker Smith,Parker Smith
6/9/2024,Ted Rhodes,1300,4,2,Ride,Parker Smith,Jesus Rios
6/9/2024,Ted Rhodes,1300,4,3,Ride,Parker Smith,Connor Stanley
6/9/2024,Towhee,1300,4,4,Ride,Parker Smith,Kyle McFarland
6/14/2024,Harpeth Hills,1630,4,1,Ride,Parker Smith,Parker Smith
6/14/2024,Harpeth Hills,1630,4,2,Ride,Parker Smith,Connor Stanley
6/14/2024,Harpeth Hills,1630,4,3,Ride,Parker Smith,Jesus Rios
6/14/2024,Harpeth Hills,1630,4,4,Ride,Parker Smith,Josh Alcala
6/15/2024,Towhee,1420,4,1,Ride,Parker Smith,Parker Smith
6/15/2024,Towhee,1420,4,2,Ride,Parker Smith,Guest
6/15/2024,Towhee,1420,4,3,Ride,Parker Smith,John Shrader
6/15/2024,Towhee,1420,4,4,Ride,Parker Smith,Mike Brooks
6/16/2024,Franklin Bridge,1530,2,1,Ride,Parker Smith,Parker Smith
6/16/2024,Franklin Bridge,1530,2,2,Ride,Parker Smith,Derek Kozakiewicz
6/22/2024,Harpeth Hills,1150,4,1,Ride,Parker Smith,Parker Smith
6/22/2024,Harpeth Hills,1150,4,2,Ride,Parker Smith,Heath Mansfield
6/22/2024,Harpeth Hills,1150,4,3,Ride,Parker Smith,Guest
6/22/2024,Harpeth Hills,1150,4,4,Ride,Parker Smith,Richard Caruso
6/29/2024,Harpeth Hills,910,4,1,Ride,Parker Smith,Parker Smith
6/29/2024,Harpeth Hills,910,4,2,Ride,Parker Smith,Guest
6/29/2024,Harpeth Hills,910,4,3,Ride,Parker Smith,Connor Stanley
6/29/2024,Harpeth Hills,910,4,4,Ride,Parker Smith,Andrew Rocco
6/30/2024,Towhee,1200,4,1,Ride,Parker Smith,Parker Smith
6/30/2024,Towhee,1200,4,2,Ride,Parker Smith,Derek Kozakiewicz
6/30/2024,Towhee,1200,4,3,Ride,Parker Smith,Jesus Rios
7/6/2024,Towhee,1050,4,1,Ride,Parker Smith,Parker Smith
7/6/2024,Towhee,1050,4,2,Ride,Parker Smith,Mike Brooks
7/6/2024,Towhee,1050,4,3,Ride,Parker Smith,Guest
7/6/2024,Towhee,1050,4,4,Ride,Parker Smith,Guest
7/7/2024,Harpeth Hills,1240,4,1,Ride,Parker Smith,Andrew Rocco
7/7/2024,Harpeth Hills,1240,4,2,Ride,Parker Smith,Gilmore Connors
7/7/2024,Harpeth Hills,1240,4,3,Ride,Parker Smith,Jesus Rios
7/7/2024,Harpeth Hills,1240,4,4,Ride,Parker Smith,Parker Smith
7/14/2024,Harpeth Hills,140,4,1,Ride,Parker Smith,Parker Smith
7/14/2024,Harpeth Hills,140,4,2,Ride,Parker Smith,Andrew Rocco
7/14/2024,Harpeth Hills,140,4,3,Ride,Parker Smith,Derek Kozakiewicz
7/14/2024,Harpeth Hills,140,4,4,Ride,Parker Smith,Mike Brooks
8/2/2024,Towhee,1530,4,1,Ride,Parker Smith,Parker Smith
8/2/2024,Towhee,1530,4,2,Ride,Parker Smith,Andrew Rocco
8/2/2024,Towhee,1530,4,3,Ride,Parker Smith,Derek Kozakiewicz
8/3/2024,Franklin Bridge,1110,4,1,Ride,Parker Smith,Parker Smith
8/3/2024,Franklin Bridge,1110,4,2,Ride,Parker Smith,Connor Stanley
8/3/2024,Franklin Bridge,1110,4,3,Ride,Parker Smith,Guest
8/3/2024,Franklin Bridge,1110,4,4,Ride,Parker Smith,Guest
8/4/2024,Mccabe,1230,4,1,Ride,Parker Smith,Parker Smith
8/4/2024,Mccabe,1230,4,2,Ride,Parker Smith,Jesus Rios
8/4/2024,Mccabe,1230,4,3,Ride,Parker Smith,Andrew Rocco
8/4/2024,Mccabe,1230,4,4,Ride,Parker Smith,Derek Kozakiewicz
8/9/2024,Harpeth Hills,1650,4,1,Ride,Parker Smith,Parker Smith
8/9/2024,Harpeth Hills,1650,4,2,Ride,Parker Smith,Derek Kozakiewicz
8/9/2024,Harpeth Hills,1650,4,3,Ride,Parker Smith,Connor Stanley
8/9/2024,Harpeth Hills,1650,4,4,Ride,Parker Smith,Jesus Rios
8/11/2024,Ted Rhodes,1230,4,1,Ride,Parker Smith,Parker Smith
8/11/2024,Ted Rhodes,1230,4,2,Ride,Parker Smith,Josh Link
8/11/2024,Ted Rhodes,1230,4,3,Ride,Parker Smith,Kyle McFarland
10/4/2024,Ted Rhodes,1530,4,1,Ride,Kyle McFarland,Parker Smith
10/4/2024,Ted Rhodes,1530,4,2,Ride,Parker Smith,Jesus Rios
10/4/2024,Ted Rhodes,1530,4,3,Ride,Parker Smith,,
10/4/2024,Ted Rhodes,1530,4,4,Ride,Parker Smith,,
10/5/2024,Franklin Bridge,1130,4,1,Ride,Parker Smith,Parker Smith
10/5/2024,Franklin Bridge,1130,4,2,Ride,Parker Smith,Seth Bambling
10/5/2024,Franklin Bridge,1130,4,3,Ride,Parker Smith,,
10/5/2024,Franklin Bridge,1130,4,4,Ride,Parker Smith,,
10/6/2024,Hermitage (Generals),1430,4,1,Ride,Parker Smith,Parker Smith
10/6/2024,Hermitage (Generals),1430,4,2,Ride,Parker Smith,Andrew Rocco
10/6/2024,Hermitage (Generals),1430,4,3,Ride,Parker Smith,Mike Brooks
10/6/2024,Hermitage (Generals),1430,4,4,Ride,Parker Smith,,
`;

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
